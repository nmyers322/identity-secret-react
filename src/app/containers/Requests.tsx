import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { STORE_ID } from 'app/constants';
import Header from './Header';
import BottomNav from '../components/BottomNav';
//import axios, { AxiosRequestConfig } from 'axios';
import { withAuth } from '@okta/okta-react';
import { Auth } from '../App';

export interface RequestsProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    auth: Auth
}

export interface RequestsState {
}

export default withAuth(inject(STORE_ID)(observer(class Requests extends React.Component<RequestsProps, RequestsState> {

    constructor(props: RequestsProps, context: any) {
        super(props, context);
        this.state = { };
    }

    // async createId() {
    //     if (await this.props.auth.isAuthenticated()) {
    //         const axiosConfig: AxiosRequestConfig = {
    //             headers: {
    //                 'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()
    //             },
    //             url: HOST + URL_USER,
    //             method: "POST",
    //             timeout: 3000
    //         };
    //         await axios(axiosConfig)
    //             .then((response) => {
    //                 const idStore = this.props[STORE_ID] as IdStore;
    //                 idStore.addId(response.data.id);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }

    render() {

        return (
            <div>
                <Header />
                
                <BottomNav />
            </div>
        );
    }
})));
