import React from 'react';
import PropTypes from 'prop-types';
import { DashboardLayout } from '@/layouts';

const Overview = () => {
  return (
    <DashboardLayout>
      <>Overview</>
    </DashboardLayout>
  );
};

Overview.propTypes = {
  auth: PropTypes.object,
  currentRouteName: PropTypes.string,
};

export default Overview;
