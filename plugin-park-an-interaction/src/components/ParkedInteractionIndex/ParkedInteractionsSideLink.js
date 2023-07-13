import { SideLink } from '@twilio/flex-ui';

export function ParkedInteractionsSideLink(props) {
    const gotoParkedInteractions = () => {
      props.flex.Actions.invokeAction('NavigateToView', { viewName: "parked-interactions" });
    };
  
    return (
      <SideLink
        {...props}
        icon="Clock"
        iconActive="Clock"
        isActive={props.activeView ===  "parked-interactions" }
        showLabel={props.showLabel}
        onClick={gotoParkedInteractions}
        key= "parked-interactions-sidelink-item"
      >
       Parked Interactions
      </SideLink>
    );
  }
  