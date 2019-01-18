import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { EmailPreviewView } from './EmailPreview.view';

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('EmailPreviewView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EmailPreviewView message="" title="" date={new Date().toISOString()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
