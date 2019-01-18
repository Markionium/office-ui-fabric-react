import { IComponent, IComponentStyles, IStyleableComponentProps, ISlotProp } from '../../Foundation';
import { ITextSlot } from '../../Text';
import { IBaseProps } from '../../Utilities';
import { IStackProps } from '../../Stack';
import { IIconSlot } from '../../utilities/factoryComponents.types';

export type IEmailPreviewComponent = IComponent<IEmailPreviewProps, IEmailPreviewTokens, IEmailPreviewStyles>;

// These types are redundant with IEmailPreviewComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type IEmailPreviewTokenReturnType = ReturnType<Extract<IEmailPreviewComponent['tokens'], Function>>;
export type IEmailPreviewStylesReturnType = ReturnType<Extract<IEmailPreviewComponent['styles'], Function>>;

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
export interface IEmailPreview {}

export interface IEmailPreviewSlots {
  root?: ISlotProp<IStackProps>;
  icon?: IIconSlot;
  title?: ITextSlot;
  message?: ITextSlot;
  date?: ITextSlot;
  stack?: ISlotProp<IStackProps>;
}

export interface IEmailMessage {
  message: string;
  title: string;
  date: Date;
}

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IEmailPreviewProps
  extends IEmailPreviewSlots,
    IStyleableComponentProps<IEmailPreviewProps, IEmailPreviewTokens, IEmailPreviewStyles>,
    IBaseProps<IEmailPreview> {}

export interface IEmailPreviewTokens {
  titleTextColor?: string;
  messageTextColor?: string;
  dateTextColor?: string;
  iconTextColor?: string;
}

export type IEmailPreviewStyles = IComponentStyles<IEmailPreviewSlots>;
