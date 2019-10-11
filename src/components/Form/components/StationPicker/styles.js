import { StyleSheet } from 'aphrodite';
import { linearGradient } from '../../../../helpers';

export default labelWidth => (theme, shadows) => StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: 16,
        boxShadow: shadows.one,
        position: 'relative',
    },

    label: {
        background: linearGradient(0, theme.label.bg.one, theme.label.bg.two),
        padding: 12,
        display: 'block',
        textAlign: 'center',
        flex: 1,
        fontSize: 16,
        fontWeight: 700,
        color: theme.label.text,
        borderRadius: '4px 0 0 4px',
    },

    input: {
        flex: 4,
        padding: 12,
        fontSize: 16,
        fontWeight: 600,
        color: theme.label.text,
        border: 0,
        background: theme.white,
        borderRadius: '0 4px 4px 0',

        ':focus': {
            outline: 0,
            borderRadius: '0 4px 0 0',
        },
    },

    suggestions: {
        position: 'absolute',
        top: '100%',
        left: labelWidth,
        right: 0,
        background: theme.offWhite,
        // padding: 12,
        zIndex: 10,
        boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25), inset 0 10px 10px -10px rgba(0, 0, 0, 0.25)',
        borderRadius: '0 0 4px 4px',
        padding: '6px 0',
    },

    suggestion: {
        padding: '6px 12px',
        fontWeight: 600,
        color: theme.black,
    },

    suggestion__clickable: {
        cursor: 'pointer',
    },

    suggestion__highlighted: {
        background: theme.primary,
        color: theme.white,
    },
});
