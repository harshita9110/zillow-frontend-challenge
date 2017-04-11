import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

export class HomeDetails extends Component {
    static propTypes = {
        details: PropTypes.object.isRequired
    }

    render() {
        let details = this.props.details;
        let src = `https://maps.google.com/maps?q=${details.address.latitude},${details.address.longitude}&output=embed`;
        return(
            <div className="details">
                <p>Estimate: {details.zestimate.amount.$t} {details.zestimate.amount.currency}</p>
                <p>{'Valuation Range:'} {details.zestimate.valuationRange.low.$t} {details.zestimate.valuationRange.low.currency} - {details.zestimate.valuationRange.high.$t} {details.zestimate.valuationRange.high.currency}</p>
                <p>The value changed by {details.zestimate.valueChange.$t} {details.zestimate.valueChange.currency} in the last {details.zestimate.valueChange.duration} days</p>
                <p>Local real estate details estimate is {details.localRealEstate.region.zindexValue}</p>
                <iframe width="300" height="170" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={src}></iframe>
            </div>
        )
    }
}
