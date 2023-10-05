import { describe, it, expect } from 'vitest';
import { truncate } from './utils';

describe('utils tests', () => {
	describe('truncate', () => {
		it('truncates to default length (10)', () => {
			const input = 'long string gets cut off';
			const expected = 'long st...';
			const result = truncate(input);

			expect(result).toBe(expected);
		});

		it('truncates to custom length', () => {
			const input = 'long string gets cut off';
			const expected = 'lon...';
			const result = truncate(input, 6);

			expect(result).toBe(expected);
		});

		it('does not allow maxLength < 4', () => {
			const input = 'long string gets cut off';

			expect(() => {
				truncate(input, 3);
			}).toThrow();
		});

		it('does not truncate string shorter than specified max length', () => {
			const input = 'long string does not get cut off';
			const expected = 'long string does not get cut off';
			const result = truncate(input, 50);

			expect(result).toBe(expected);
		});
	});
});
