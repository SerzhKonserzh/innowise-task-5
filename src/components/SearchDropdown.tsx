'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRecipesStore } from '@/src/store/recipes.store';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

interface SearchResult {
	id: number;
	name: string;
	image: string;
}

export function SearchDropdown() {
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const { searchRecipes } = useRecipesStore();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const searchRecipesAPI = useCallback(
		async (term: string) => {
			if (term.trim() === '') {
				setSearchResults([]);
				return;
			}

			try {
				const results = await searchRecipes(term);
				const formattedResults = results.map(recipe => ({
					id: recipe.id,
					name: recipe.name,
					image: recipe.image
				})).slice(0, 5);
				
				setSearchResults(formattedResults);
			} catch (error) {
				console.error('Search error:', error);
				setSearchResults([]);
			}
		},
		[searchRecipes]
	);

	useEffect(() => {
		searchRecipesAPI(debouncedSearchTerm);
	}, [debouncedSearchTerm, searchRecipesAPI]);

	useEffect(() => {
		setIsOpen(searchTerm.length > 0 && searchResults.length > 0);
	}, [searchTerm, searchResults]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative w-full max-w-lg" ref={dropdownRef}>
			<div className="relative">
				<InputGroup className="w-full">
					<InputGroupInput type="text"
					placeholder="Search recipes..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}/>
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
				</InputGroup>
				
			</div>

			{isOpen && (
				<Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg max-h-80 overflow-y-auto">
					{searchResults.map(recipe => (
						<Link
							key={recipe.id}
							href={`/recipes/${recipe.id}`}
							className="block p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
							onClick={() => {
								setSearchTerm('');
								setIsOpen(false);
							}}
						>
							<div className="flex items-center gap-3">
								<img
									src={recipe.image}
									alt={recipe.name}
									className="w-10 h-10 object-cover rounded"
								/>
								<span className="text-sm font-medium">{recipe.name}</span>
							</div>
						</Link>
					))}
				</Card>
			)}
		</div>
	);
}
