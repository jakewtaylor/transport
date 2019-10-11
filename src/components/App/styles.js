import { StyleSheet } from 'aphrodite';
import { linearGradient } from '../../helpers';

export default theme => StyleSheet.create({
    container: {
        background: linearGradient(29, theme.bg.one, theme.bg.two),
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
