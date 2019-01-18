import { EmailPreviewView } from './EmailPreview.view';
import { EmailPreviewStyles, EmailPreviewTokens } from './EmailPreview.styles';
import { IEmailPreviewProps } from './EmailPreview.types';
import { createComponent } from '../../Foundation';

export const EmailPreview: React.StatelessComponent<IEmailPreviewProps> = createComponent({
  displayName: 'EmailPreview',
  view: EmailPreviewView,
  styles: EmailPreviewStyles,
  tokens: EmailPreviewTokens
});
