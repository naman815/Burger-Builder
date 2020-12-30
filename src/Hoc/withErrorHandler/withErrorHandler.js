import React,{Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
import {NavLink} from 'react-router-dom';

const withErrorHandler =(WrappedComponent,axios) => {
    return class extends Component{

        state ={
            error : null
        }

        componentWillMount(){

            this.reqInter = axios.interceptors.request.use(req =>{
                this.setState({error : null})
                return req;
            });

            this.resInter= axios.interceptors.response.use(res => res,error =>{
                this.setState({error :error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        <p>
                            {this.state.error ? this.state.error.message : null}
                        </p>
                        <NavLink to="/">close</NavLink>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler;