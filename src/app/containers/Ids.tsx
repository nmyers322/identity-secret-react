import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { IdStore } from 'app/stores';
import Id from '../components/Id';
import { STORE_ID } from 'app/constants';
import Header from './Header';
import BottomNav from '../components/BottomNav';
import axios, { AxiosRequestConfig } from 'axios';
import { HOST, URL_USER } from '../constants';
import { withAuth } from '@okta/okta-react';
import { Auth } from '../App';
import { IdModel } from '../models/IdModel';
import Button from '@material-ui/core/Button';

export interface IdsProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ID]: IdsStore;
    auth: Auth
}

export interface IdsState {
}

export default withAuth(inject(STORE_ID)(observer(class Ids extends React.Component<IdsProps, IdsState> {

    constructor(props: IdsProps, context: any) {
        super(props, context);
        this.createId = this.createId.bind(this);
        this.deleteId = this.deleteId.bind(this);
        this.fetchIds = this.fetchIds.bind(this);
        this.state = { };
    }

    async createId() {
        if (await this.props.auth.isAuthenticated()) {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()
                },
                url: HOST + URL_USER,
                method: "POST",
                timeout: 3000
            };
            await axios(axiosConfig)
                .then((response) => {
                    const idStore = this.props[STORE_ID] as IdStore;
                    idStore.addId(response.data.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async deleteId(id: IdModel) {
        if (await this.props.auth.isAuthenticated()) {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()
                },
                url: HOST + URL_USER + "/" + id.id,
                method: "DELETE",
                timeout: 3000
            };
            await axios(axiosConfig)
                .then((response) => {
                    const idStore = this.props[STORE_ID] as IdStore;
                    idStore.deleteId(id);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async fetchIds() {
        if (await this.props.auth.isAuthenticated()) {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()
                },
                url: HOST + URL_USER,
                method: "GET",
                timeout: 3000
            };
            await axios(axiosConfig)
                .then((response) => {
                    const idStore = this.props[STORE_ID] as IdStore;
                    idStore.reloadIds(response.data.ids);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    componentDidMount() {
        this.fetchIds();
    }

    render() {
        const idStore = this.props[STORE_ID] as IdStore;

        return (
            <div>
                <Header />
                { idStore.ids.map((id: IdModel) => (
                    <div key={id.id}>
                        <Id id={id} />
                        <Button
                            onClick={() => {this.deleteId(id);}}>
                            X
                        </Button>
                    </div>
                )) } 
                <Button
                    onClick={this.createId}>
                    Create New ID
                </Button>
                <BottomNav />
            </div>
        );
    }
})));
