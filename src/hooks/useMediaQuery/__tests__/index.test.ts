import { renderHook } from '@testing-library/react-hooks';
import { useMediaQuery } from '..';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('useMediaQuery tests', () => {
    it('should be defined', () => {
        expect(useMediaQuery).toBeDefined();
    });

    it('renders the hook correctly and checks types', () => {
        const { result } = renderHook(() => useMediaQuery());
        expect(result.current).toBe(false);
        expect(typeof result.current).toBe('boolean');
    });
})