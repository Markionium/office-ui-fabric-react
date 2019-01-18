/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { Text } from '../../Text';

import { IEmailPreviewComponent, IEmailPreviewProps, IEmailPreviewSlots } from './EmailPreview.types';
import { Stack } from '../Stack';
import { Icon } from 'office-ui-fabric-react';

export const EmailPreviewView: IEmailPreviewComponent['view'] = props => {
  const Slots = getSlots<IEmailPreviewProps, IEmailPreviewSlots>(props, {
    root: Stack,
    icon: Icon,
    title: Text,
    message: Text,
    date: Text,
    stack: Stack
  });

  return (
    <Slots.root>
      <Slots.stack horizontal>
        <Slots.icon iconName="Mail" />
        <Slots.title />
        <Slots.date />
      </Slots.stack>
      <Slots.message />
    </Slots.root>
  );
};
