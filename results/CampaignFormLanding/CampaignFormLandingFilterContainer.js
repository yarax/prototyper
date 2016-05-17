import React from 'react';
import {connect} from 'react-redux';
import CampaignFormLandingFilter from './CampaignFormLandingFilter';

import CampaignFormLandingTabsContainer from './CampaignFormLandingTabsContainer';


function CampaignFormLandingFilterContainer({prop}) {
  return (

    <div>

    <CampaignFormLandingFilter/>
    
    <CampaignFormLandingTabsContainer/>
    
    </div>

  );
}

export default CampaignFormLandingFilterContainer;