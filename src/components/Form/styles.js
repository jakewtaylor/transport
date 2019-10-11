import { StyleSheet } from 'aphrodite';
import { linearGradient } from '../../helpers';

export default (theme, shadows) => StyleSheet.create({
    form: {
        width: 375,
        padding: '0 16px',
    },

    submit: {
        width: '100%',
        fontSize: 16,
        fontWeight: 700,
        border: 0,
        color: theme.black,
        borderRadius: 4,
        background: linearGradient(0, theme.submit.bg.one, theme.submit.bg.two),
        padding: 12,
        boxShadow: shadows.one,
        cursor: 'pointer',

        ':focus': {
            outline: 0,
            background: linearGradient(0, theme.submit.bgAlt.one, theme.submit.bgAlt.two),
        },
    },
});
