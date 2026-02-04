'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/src/components/CustomSelect';
import { MEAL_TYPES } from '@/src/constants';

const SORT_OPTIONS = [
	{ value: 'name', label: 'Name' },
	{ value: 'prepTimeMinutes', label: 'Prep Time' },
	{ value: 'cookTimeMinutes', label: 'Cook Time' },
	{ value: 'caloriesPerServing', label: 'Calories' },
	{ value: 'rating', label: 'Rating' }
];

export function FilterBar({
	onFiltersChange
}: {
	onFiltersChange: (filters: {
		mealType: string;
		sortBy: string;
		order: 'asc' | 'desc';
	}) => void;
}) {
	const [selectedMealType, setSelectedMealType] = useState<string>('');
	const [sortBy, setSortBy] = useState<string>('name');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const handleApplyFilters = () => {
		onFiltersChange({
			mealType: selectedMealType,
			sortBy,
			order: sortOrder
		});
	};

	const handleResetFilters = () => {
		setSelectedMealType('');
		setSortBy('name');
		setSortOrder('asc');
		onFiltersChange({ mealType: '', sortBy: 'name', order: 'asc' });
	};

	const mealTypeOptions = [
		{ value: 'all-meal-types', label: 'All Meal Types' },
		...MEAL_TYPES.map(mealType => ({ value: mealType, label: mealType }))
	];

	return (
		<div className="flex flex-wrap gap-4 items-end mb-6">
			<CustomSelect
				label="Meal Type"
				value={selectedMealType || 'all-meal-types'}
				onValueChange={value =>
					setSelectedMealType(value === 'all-meal-types' ? '' : value)
				}
				items={mealTypeOptions}
				placeholder="Select meal type"
			/>

			<CustomSelect
				label="Sort By"
				value={sortBy}
				onValueChange={setSortBy}
				items={SORT_OPTIONS}
				placeholder="Sort by"
			/>

			<CustomSelect
				label="Order"
				value={sortOrder}
				onValueChange={value => setSortOrder(value as 'asc' | 'desc')}
				items={[
					{ value: 'asc', label: 'Asc' },
					{ value: 'desc', label: 'Desc' }
				]}
				placeholder="Order"
				className="w-25"
			/>

			<div className="flex gap-2">
				<Button onClick={handleApplyFilters}>Apply</Button>
				<Button variant="outline" onClick={handleResetFilters}>
					Reset
				</Button>
			</div>
		</div>
	);
}
