import React from 'react'
import './confirm-patient.css';
import moment from 'moment';

export const NotificationConfirmPatientItem = (props) => {
    const date = props.patient.created_at;
    const formatedDate = moment(`${date}`).startOf('minutes').fromNow();

    return (
        <React.Fragment>
            <div className="notification-item">
                <div>
                    <h3>Pasien baru dengan nama {props.patient.name}</h3>
                    <p>{formatedDate}</p>
                </div>
            </div>
        </React.Fragment>
    )
}
