import React from 'react'
import { FlexPlugin } from '@twilio/flex-plugin'
import { CustomizationProvider } from '@twilio-paste/core/customization'
import { SyncClient } from 'twilio-sync';
import { ParkButton } from './components'

import { ParkedInteractionsSideLink } from './components/ParkedInteractionIndex/ParkedInteractionsSideLink';
import './notifications'
import './actions'
import { ParkedInteractionsView } from './components/ParkedInteractionIndex/ParkedInteractionsView';
import { View } from '@twilio/flex-ui';

const PLUGIN_NAME = 'ConversationsParkAnInteractionPlugin'

export default class ConversationsParkAnInteractionPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME)
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    })


    window.TwilioSyncClient = new SyncClient(manager.user.token);

    flex.TaskCanvasHeader.Content.add(
      <ParkButton key='conversation-park-button' />,
      {
        sortOrder: 1,
        if: props =>
          props.channelDefinition.capabilities.has('Chat') &&
          props.task.taskStatus === 'assigned'
      }
    )


    flex.SideNav.Content.add(<ParkedInteractionsSideLink key="parked-interactions-link" flex={flex} />, {
      sortOrder: 5,
    });


    flex.ViewCollection.Content.add(
      <View name="parked-interactions" key="parked-interactions">
        <ParkedInteractionsView key="parked-interactions-viewcontent" />
      </View>,
      {
       
      },
    );
  }
}
