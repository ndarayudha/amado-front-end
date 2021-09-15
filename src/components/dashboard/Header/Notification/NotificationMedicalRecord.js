import React, {useState, useEffect} from 'react'
import axios from "axios"
import { NotificationConfirmPatientItem } from './NotificationItem/NotificationConfirmPatientItem'
import {
    Menu,
  } from "antd";

export const NotificationMedicalRecord = () => {
    const [patients, setPatients] = useState();

    return (
        <React.Fragment>
            {/* <h4>Tidak ada notifikasi</h4> */}
            <Menu.Item>
                <NotificationConfirmPatientItem patient/>
            </Menu.Item>
            <Menu.Item>
                <NotificationConfirmPatientItem patient/>
            </Menu.Item>
        </React.Fragment>
    )
}
