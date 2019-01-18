import * as React from 'react';
import { Stack, EmailPreview } from '@uifabric/experiments';

// tslint:disable:jsx-no-lambda
export class SlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack>
        <EmailPreview
          title="Re: PR Deploys"
          message="Just as an FYI, experiments was fixed with the merge of this PR: https://github.com/OfficeDev/office-ui-fabric-react/pull/7616"
          date={new Date().toISOString()}
        />

        <EmailPreview
          title="Re: PR Deploys"
          message="Just as an FYI, experiments was fixed with the merge of this PR: https://github.com/OfficeDev/office-ui-fabric-react/pull/7616"
          date={new Date().toISOString()}
          icon={{
            styles: {
              root: { padding: '10px' }
            },
            iconName: 'Share'
          }}
        />

        <EmailPreview
          title="Re: PR Deploys"
          message="Just as an FYI, experiments was fixed with the merge of this PR: https://github.com/OfficeDev/office-ui-fabric-react/pull/7616"
          date={new Date().toISOString()}
          root={{
            horizontal: true
          }}
        />

        <EmailPreview
          title="Re: PR Deploys"
          message="Just as an FYI, experiments was fixed with the merge of this PR: https://github.com/OfficeDev/office-ui-fabric-react/pull/7616"
          icon={() => <span />}
          date={{
            children: new Date().toISOString()
          }}
          stack={{
            horizontal: false
          }}
        />
      </Stack>
    );
  }
}
