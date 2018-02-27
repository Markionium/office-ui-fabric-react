import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  createRef,
  RefObject
} from '../../Utilities';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { Autofill } from 'office-ui-fabric-react/lib/components/Autofill/Autofill';
import { IPickerItemProps, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import * as stylesImport from './BaseExtendedPicker.scss';
import { IBaseExtendedPickerProps, IBaseExtendedPicker } from './BaseExtendedPicker.types';
import { IBaseFloatingPickerProps, BaseFloatingPicker } from '../../FloatingPicker';
import { BaseSelectedItemsList, IBaseSelectedItemsListProps } from '../../SelectedItemsList';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IBaseExtendedPickerState {
  // tslint:disable-next-line:no-any
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  isSearching?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
  isResultsFooterVisible?: boolean;
}

export class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BaseComponent<P, IBaseExtendedPickerState>
  implements IBaseExtendedPicker<T> {
  // tslint:disable-next-line:no-any
  public floatingPicker: RefObject<BaseFloatingPicker<any, any>> =
    // tslint:disable-next-line:no-any
    createRef<BaseFloatingPicker<any, any>>();
  // tslint:disable-next-line:no-any
  public selectedItemsList: RefObject<BaseSelectedItemsList<any, any>> =
    // tslint:disable-next-line:no-any
    createRef<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>();

  protected root: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  protected input: RefObject<Autofill> = createRef<Autofill>();
  protected focusZone: RefObject<FocusZone> = createRef<FocusZone>();
  protected selection: Selection;
  protected floatingPickerProps: IBaseFloatingPickerProps<T>;
  protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);

    this.state = {
      items: items ? items : [],
      suggestedDisplayValue: '',
    };

    this.floatingPickerProps = this.props.floatingPickerProps;
    this.selectedItemsListProps = this.props.selectedItemsListProps;
  }

  // tslint:disable-next-line:no-any
  public get items(): any {
    return this.selectedItemsList.value ? this.selectedItemsList.value.items : [];
  }

  public componentDidMount(): void {
    this.forceUpdate();
  }

  public focus(): void {
    this.focusZone.value && this.focusZone.value.focus();
  }

  public get inputElement(): HTMLInputElement | null {
    return this.input.value && this.input.value.inputElement;
  }

  public render(): JSX.Element {
    let { suggestedDisplayValue } = this.state;
    let {
      className,
      inputProps,
      disabled
    } = this.props;

    return (
      <div
        ref={ this.root }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
      >
        <FocusZone
          ref={ this.focusZone }
          direction={ FocusZoneDirection.bidirectional }
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke }
          onKeyDown={ this.onBackspace }
          onCopy={ this.onCopy }
        >
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) } role={ 'list' }>
              { this.props.headerComponent }
              { this.renderSelectedItemsList() }
              { this.canAddItems() && (<Autofill
                { ...inputProps as IInputProps }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this.input }
                onFocus={ this.onInputFocus }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ 'sug-' + this.state.items.length }
                aria-owns='suggestion-list'
                aria-expanded='true'
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
                aria-controls='selected-suggestion-alert'
                onPaste={ this.onPaste }
              />) }
            </div>
          </SelectionZone>
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  @autobind
  protected onSelectionChange(): void {
    this.forceUpdate();
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element {
    let onRenderFloatingPicker = this.props.onRenderFloatingPicker;
    return (onRenderFloatingPicker({
      componentRef: this.floatingPicker,
      onChange: this._onSuggestionSelected,
      inputElement: this.input.value ? this.input.value.inputElement : undefined,
      selectedItems: this.selectedItemsList.value ? this.selectedItemsList.value.items : [],
      ...this.floatingPickerProps
    }));
  }

  protected renderSelectedItemsList(): JSX.Element {
    const onRenderSelectedItems = this.props.onRenderSelectedItems;
    return (onRenderSelectedItems({
      componentRef: this.selectedItemsList,
      ...this.selectedItemsListProps
    }));
  }

  protected resetFocus(index?: number): void {
    const { items } = this.state;
    const { value: root } = this.root;

    if (items.length && index! >= 0) {
      const newEl = root && root.querySelectorAll('[data-selection-index]')[Math.min(index!, items.length - 1)] as HTMLElement;
      const { value: focusZone } = this.focusZone;
      if (newEl && focusZone) {
        focusZone.focusElement(newEl);
      }
    } else if (!this.canAddItems()) {
      (items[items.length - 1] as IPickerItemProps<T>).selected = true;
      this.resetFocus(items.length - 1);
    } else {
      this.input.value && this.input.value.focus();
    }
  }

  @autobind
  protected onInputChange(value: string): void {
    this.floatingPicker.value && this.floatingPicker.value.onQueryStringChanged(value);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | Autofill>): void {
    this.selectedItemsList.value && this.selectedItemsList.value.unselectAll();
    this.floatingPicker.value && this.floatingPicker.value.showPicker();

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  @autobind
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }

    const { value: input } = this.input;
    if (input && !input.isValueSelected && input.cursorLocation === 0) {
      this.selectedItemsList.value && this.selectedItemsList.value.removeItemAt(this.items.length - 1);
      this._onSelectedItemsChanged();
    }
  }

  @autobind
  protected onCopy(ev: React.ClipboardEvent<HTMLElement>): void {
    // Pass it down into the selected items list
    this.selectedItemsList.value && this.selectedItemsList.value.onCopy(ev);
  }

  @autobind
  protected onPaste(ev: React.ClipboardEvent<Autofill | HTMLInputElement>): void {
    if (this.props.onPaste) {
      let inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      this.props.onPaste(inputText);
    }
  }

  @autobind
  protected _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    // If suggestions are shown let up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.floatingPicker.value && this.floatingPicker.value.isSuggestionsShown) {
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
        case KeyCodes.enter:
          return true;
      }
    }

    if (ev.ctrlKey) {
      return true;
    }

    return false;
  }

  @autobind
  protected _onSuggestionSelected(item: T): void {
    this.selectedItemsList.value && this.selectedItemsList.value.addItems([item]);
    if (this.props.onItemSelected) {
      this.props.onItemSelected(item);
    }
    this.input.value && this.input.value.clear();

    this.floatingPicker.value && this.floatingPicker.value.hidePicker();
  }

  @autobind
  protected _onSelectedItemsChanged(): void {
    this.input.value && this.input.value.focus();
  }
}