import { renderHook } from '@testing-library/react-hooks';
import { useAskForNavigation } from './useAskForNavigation';

const buttons = [
    {
        text: 'Stay here',
        value: 0,
        color: 'default',
        variant: 'outlined',
        size: 'small',
        textColor: '#8895A5',
    },
    {
        text: 'Discard and continue',
        value: 1,
        color: 'default',
        variant: 'outlined',
        size: 'small',
        textColor: '#8895A5',
    },
    {
        text: 'Save and continue',
        value: 2,
        color: 'primary',
        variant: 'contained',
        size: 'small',
        textColor: 'white',
    },
];

jest.mock('../../components/CustomizedDialog/useDialog.ts', () => ({
    ...jest.requireActual('../../components/CustomizedDialog/useDialog.ts'),
    useDialog: jest.fn(),
}));

describe('Ask for navigation', () => {
    it('if answer "Stay here" - stay at present page', () => {
        const open = jest.fn().mockImplementation(() => Promise.resolve(0));

        const activate = jest.fn();
        const saveAction = jest.fn();
        const close = jest.fn();
        const translation = jest.fn();

        const { result } = renderHook(() =>
            useAskForNavigation(
                buttons,
                activate,
                saveAction,
                open,
                close,
                translation,
            ),
        );

        close();
        expect(close).toHaveBeenCalledTimes(1);
        return result.current().then((result) => expect(result).toEqual(false));
    });

    it('if answer "Discard and continue" - move to chosen page', () => {
        const open = jest.fn().mockImplementation(() => Promise.resolve(1));

        const activate = jest.fn();
        const saveAction = jest.fn();
        const close = jest.fn();
        const translation = jest.fn();

        const { result } = renderHook(() =>
            useAskForNavigation(
                buttons,
                activate,
                saveAction,
                open,
                close,
                translation,
            ),
        );
        close();
        expect(close).toHaveBeenCalledTimes(1);
        return result.current().then((result) => expect(result).toEqual(true));
    });

    it('if answer "Save and continue" - move to chosen page', () => {
        const open = jest.fn().mockImplementation(() => Promise.resolve(1));

        const activate = jest.fn();
        const saveAction = jest.fn();
        const close = jest.fn();
        const translation = jest.fn();

        const { result } = renderHook(() =>
            useAskForNavigation(
                buttons,
                activate,
                saveAction,
                open,
                close,
                translation,
            ),
        );

        close();
        expect(close).toHaveBeenCalledTimes(1);
        activate(2);
        expect(activate).toHaveBeenCalledTimes(1);
        saveAction();
        expect(saveAction).toHaveBeenCalledTimes(1);
        return result.current().then((result) => expect(result).toEqual(true));
    });
});
