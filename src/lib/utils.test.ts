import { describe, it, expect } from 'vitest';
import { sentenceCase, truncate } from './utils';

describe('utils tests', () => {
	describe('truncate()', () => {
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

	describe('senctenceCase()', () => {
		it('correctly transforms lowercase string', () => {
			const input = 'abcd';
			const expected = 'Abcd';
			const result = sentenceCase(input);

			expect(result).toBe(expected);
		});

		it('correctly transforms uppercase string', () => {
			const input = 'ABCD';
			const expected = 'Abcd';
			const result = sentenceCase(input);

			expect(result).toBe(expected);
		});

		it('correctly transforms mixed-case string', () => {
			const input = 'AbcD';
			const expected = 'Abcd';
			const result = sentenceCase(input);

			expect(result).toBe(expected);
		});

		it('only transforms first character to uppercase', () => {
			const input = 'AbcD EFgh';
			const expected = 'Abcd efgh';
			const result = sentenceCase(input);

			expect(result).toBe(expected);
		});
	});
});
