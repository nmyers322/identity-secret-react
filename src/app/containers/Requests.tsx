import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { STORE_REQUEST, URL_REQUEST, HOST } from 'app/constants';
//import { RequestStore } from '../stores/RequestStore';
import Header from './Header';
import BottomNav from '../components/BottomNav';
import axios, { AxiosRequestConfig } from 'axios';
import { withAuth } from '@okta/okta-react';
import { Auth } from '../App';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export interface RequestsProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_REQUEST]: RequestStore
    auth: Auth
}

export interface RequestsState {
    newRequestAttribute: string,
    newRequestOwner: string,
    newRequestRequester: string
}

export default withAuth(inject(STORE_REQUEST)(observer(class Requests extends React.Component<RequestsProps, RequestsState> {

    constructor(props: RequestsProps, context: any) {
        super(props, context);
        this.createRequest = this.createRequest.bind(this);
        this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
        this.handleChangeOwner = this.handleChangeOwner.bind(this);
        this.handleChangeRequester = this.handleChangeRequester.bind(this);
        this.state = {
            newRequestAttribute: "",
            newRequestOwner: "",
            newRequestRequester: ""
        };
    }

    handleChangeAttribute = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newRequestAttribute: event.target.value
        });
    }

    handleChangeOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newRequestOwner: event.target.value
        });
    }

    handleChangeRequester = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newRequestRequester: event.target.value
        });
    }

    async createRequest() {
        if (await this.props.auth.isAuthenticated()) {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()
                },
                url: HOST + URL_REQUEST,
                method: "POST",
                timeout: 3000,
                data: {
                    owner: this.state.newRequestOwner,
                    attribute: this.state.newRequestAttribute,
                    requester: this.state.newRequestRequester
                }
            };
            await axios(axiosConfig)
                .then((response) => {
                    //const requestStore = this.props[STORE_REQUEST] as RequestStore;
                    console.log(response);
                    this.setState({
                        newRequestAttribute: "",
                        newRequestOwner: "",
                        newRequestRequester: ""
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        let { newRequestAttribute, newRequestOwner, newRequestRequester } = this.state;
        return (
            <div>
                <Header />
                <div>
                    <Input 
                        fullWidth={true}
                        name="newRequestOwner"
                        onChange={this.handleChangeOwner}
                        value={newRequestOwner} />
                    <Input
                        fullWidth={true}
                        name={"newRequestAttribute"}
                        onChange={this.handleChangeAttribute}
                        value={newRequestAttribute} />
                    <Input
                        fullWidth={true}
                        name={"newRequestRequester"}
                        onChange={this.handleChangeRequester}
                        value={newRequestRequester} />
                    <Button
                        onClick={this.createRequest}>
                        Initiate new request
                    </Button>
                </div>
                <BottomNav />
            </div>
        );
    }
})));
