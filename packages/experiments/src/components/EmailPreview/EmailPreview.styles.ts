import { IEmailPreviewComponent, IEmailPreviewStylesReturnType, IEmailPreviewTokenReturnType } from './EmailPreview.types';
import { ITheme } from '../../Styling';

const titleTokens = (theme: ITheme): IEmailPreviewComponent['tokens'] => ({
  titleTextColor: theme.palette.neutralDark
});

const messageTokens = (theme: ITheme): IEmailPreviewComponent['tokens'] => ({
  messageTextColor: theme.palette.neutralPrimary
});

const dateTokens = (theme: ITheme): IEmailPreviewComponent['tokens'] => ({
  dateTextColor: theme.palette.neutralSecondary
});

const iconTokens = (theme: ITheme): IEmailPreviewComponent['tokens'] => ({
  iconTextColor: theme.palette.themePrimary
});

export const EmailPreviewTokens: IEmailPreviewComponent['tokens'] = (props, theme): IEmailPreviewTokenReturnType => [
  titleTokens(theme),
  messageTokens(theme),
  dateTokens(theme),
  iconTokens(theme)
];

export const EmailPreviewStyles: IEmailPreviewComponent['styles'] = (props, theme, tokens): IEmailPreviewStylesReturnType => {
  return {
    root: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLight
        }
      }
    },
    stack: {
      // width: '100%'
    },
    title: {
      flexGrow: 1,
      color: tokens.titleTextColor,
      ...theme.fonts.large
    },
    message: {
      color: tokens.messageTextColor,
      ...theme.fonts.medium
    },
    date: {
      color: tokens.dateTextColor
    },
    icon: {
      flex: 0,
      display: 'flex',
      alignItems: 'center',
      flexGrow: 0,
      paddingLeft: 10,
      paddingRight: 10,
      color: tokens.iconTextColor
    }
  };
};
