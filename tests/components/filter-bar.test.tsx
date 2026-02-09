import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterBar } from '../../src/components/FilterBar';

vi.mock('../../src/components/CustomSelect', () => ({
	CustomSelect: ({
		label,
		value,
		onValueChange,
		items,
		placeholder
	}: {
		label: string;
		value: string;
		onValueChange: (value: string) => void;
		items: { value: string; label: string }[];
		placeholder: string;
	}) => (
		<div data-testid={`custom-select-${label}`}>
			<label>{label}</label>
			<select
				value={value}
				onChange={e => onValueChange(e.target.value)}
				data-testid={`select-${label}`}
			>
				{items.map(item => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</div>
	)
}));

describe('FilterBar', () => {
	const mockOnFiltersChange = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders filter bar with all select options', () => {
		render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

		expect(screen.getByTestId('custom-select-Meal Type')).toBeInTheDocument();
		expect(screen.getByTestId('custom-select-Sort By')).toBeInTheDocument();
		expect(screen.getByTestId('custom-select-Order')).toBeInTheDocument();

		expect(screen.getByText('Apply')).toBeInTheDocument();
		expect(screen.getByText('Reset')).toBeInTheDocument();
	});

	it('calls onFiltersChange with correct parameters when Apply is clicked', () => {
		render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

		fireEvent.change(screen.getByTestId('select-Meal Type'), {
			target: { value: 'breakfast' }
		});

		fireEvent.change(screen.getByTestId('select-Sort By'), {
			target: { value: 'prepTimeMinutes' }
		});

		fireEvent.change(screen.getByTestId('select-Order'), {
			target: { value: 'desc' }
		});

		fireEvent.click(screen.getByText('Apply'));

		expect(mockOnFiltersChange).toHaveBeenCalledWith({
			mealType: 'breakfast',
			sortBy: 'prepTimeMinutes',
			order: 'desc'
		});
	});

	it('resets filters when Reset button is clicked', () => {
		render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

		fireEvent.change(screen.getByTestId('select-Meal Type'), {
			target: { value: 'lunch' }
		});

		fireEvent.change(screen.getByTestId('select-Sort By'), {
			target: { value: 'rating' }
		});

		fireEvent.change(screen.getByTestId('select-Order'), {
			target: { value: 'asc' }
		});

		fireEvent.click(screen.getByText('Reset'));

		expect(mockOnFiltersChange).toHaveBeenCalledWith({
			mealType: '',
			sortBy: 'name',
			order: 'asc'
		});
	});

	it('handles "All Meal Types" selection correctly', () => {
		render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

		fireEvent.change(screen.getByTestId('select-Meal Type'), {
			target: { value: 'all-meal-types' }
		});

		fireEvent.click(screen.getByText('Apply'));

		expect(mockOnFiltersChange).toHaveBeenCalledWith({
			mealType: '',
			sortBy: 'name',
			order: 'asc'
		});
	});
});
