import * as React from 'react';
import { BaseComponent, classNamesFunction, customizable, createRef } from '../../Utilities';
import { ILink, ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';
import { KeytipData } from '../../KeytipData';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link = createRef<HTMLAnchorElement | HTMLButtonElement | null>();

  public render(): JSX.Element {
    const { disabled, children, className, href, theme, styles, keytipProps } = this.props;

    const classNames = getClassNames(styles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const RootType = this._getRootType(this.props);

    return (
      <KeytipData
        keytipProps={keytipProps}
        ariaDescribedBy={(this.props as { 'aria-describedby': string })['aria-describedby']}
        disabled={disabled}
      >
        {(keytipAttributes: any): JSX.Element => (
          <RootType
            {...keytipAttributes}
            {...this._removeInvalidPropsForRootType(RootType, this.props)}
            className={classNames.root}
            onClick={this._onClick}
            ref={this._link}
            aria-disabled={disabled}
          >
            {children}
          </RootType>
        )}
      </KeytipData>
    );
  }

  public focus() {
    if (this._link.current) {
      this._link.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const { onClick, disabled } = this.props;

    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  };

  private _removeInvalidPropsForRootType(
    RootType: string | React.ComponentClass | React.StatelessComponent,
    props: ILinkProps & { getStyles?: any }
  ): Partial<ILinkProps> {
    // Deconstruct the props so we remove props like `as`, `theme` and `styles`
    // as those will always be removed. We also take some props that are optional
    // based on the RootType.
    const { children, as, disabled, target, href, theme, getStyles, styles, ...restProps } = props;

    // RootType will be a string if we're dealing with an html component
    if (typeof RootType === 'string') {
      // Remove the disabled prop for anchor elements
      if (RootType === 'a') {
        return {
          target,
          href,
          ...restProps
        };
      }

      // Remove the target and href props for non anchor elements
      return { ...restProps, disabled };
    }

    // Retain all props except 'as' for ReactComponents
    return { target, href, disabled, ...restProps };
  }

  private _getRootType(props: ILinkProps): string | React.ComponentClass | React.StatelessComponent {
    if (props.as) {
      return props.as;
    }

    if (props.href) {
      return 'a';
    }

    return 'button';
  }
}
