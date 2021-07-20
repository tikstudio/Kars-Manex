import React, { Component } from 'react';
import AdminWrapper from "../components/AdminWrapper";
import { connect } from "react-redux";
import { allUsers, deleteUser, updateUser, userInfoDelete } from "../store/actions/users";
import Accordions from "../components/utils/Accordion";
import Search from "../components/utils/Search";
import Selects from "../components/form/Select";
import _ from "lodash";
import CircleLoad from "../components/loads/CircularLoading";

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sortData: [
        {title: 'Ամենաթարմերը', value: 'createdAt-DESC'},
        {title: 'Ամենահները', value: 'createdAt-ASC'},
        {title: 'Թարմացված՝  ամենահները', value: 'updatedAt-ASC'},
        {title: 'Թարմացված՝  ամենանորերը', value: 'updatedAt-DESC'},
      ],
      sorts: 'createdAt-DESC',
      formData: {},
    }
  }

  componentDidMount() {
    this.props.allUsers();
  }

  handleSorting = (ev) => {
    this.setState({sorts: ev.target.value});
    let res = _.split(ev.target.value, '-', 2);
    const {formData, search} = this.state;
    _.set(formData, 'sortKey', res[0]);
    _.set(formData, 'sortValue', res[1]);
    this.setState({formData});
    this.props.allUsers(search, formData.sortKey, formData.sortValue)
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }
  search = async (event) => {
    const {search} = this.state;
    if (event.code === 'Enter'){
      await this.props.allUsers(search);
    }
  }

  render() {
    const {users, allUsersStatus, deleteInfo, delErrors, updateInfo, upErrors} = this.props;
    const {search, sortData, sorts} = this.state;
    return (
      <AdminWrapper>
        <div className='container' onKeyPress={ e => this.search(e) }>
          <div className="all__users_content">
            <div className='users__sort_area'>
              <p>Ընդհանուր ({ users?.length })</p>
              <div className='user__search_area'>
                <Search id={ "user__search_input" }
                        placeholder={ "Փնտրել օգտատեր..." }
                        title={ "Փնտրել..." }
                        type={ "search" }
                        size={ 'small' }
                        name={ "search" }
                        onChange={ e => this.handleSearch(e) }/>
                <button className='user__search_button' type='button'
                        onClick={ () => this.props.allUsers(search) }
                >Փնտրել
                </button>
              </div>
              <div className='user__sort_block'>
                <Selects
                  size={ "small" }
                  label={ 'Ամենաթարմերը' }
                  data={ sortData }
                  value={ sorts }
                  title={ _.find(sortData, ['value', sorts])?.title }
                  vName={ 'title' }
                  keyValue={ 'value' }
                  onChange={ (event) => this.handleSorting(event) }
                />
              </div>
            </div>
            <div className='all__users_title'>
              <p>ID</p>
              <p>Ավատար</p>
              <p>Անուն/Ազգանուն</p>
              <p>Email/Հեռախոս</p>
              <p>Գործունեություն</p>
              <p>Ստատուս</p>
              <p>Ստեղծվել է</p>
              <p style={ {color: 'rgb(81, 81, 175)'} }>Թարմացնել</p>
              <p style={ {color: 'red'} }>Ջնջել</p>
            </div>
            { allUsersStatus === "request" ? <div className="centering"><CircleLoad/></div> :
              allUsersStatus === 'success' && users.length >= 1 ? (
                <Accordions
                  data={ users }
                  status={ allUsersStatus }
                  deleteInfo={ deleteInfo }
                  delErrors={ delErrors }
                  updateInfo={ updateInfo }
                  upErrors={ upErrors }
                  newRequest={ this.props.allUsers }
                  cacheDelete={ this.props.userInfoDelete }
                  onUpdate={ this.props.updateUser }
                  onDelete={ this.props.deleteUser }
                />
              ) : <p className='centering'>Օգտատեր չկա</p> }
          </div>
        </div>
      </AdminWrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  users: state.users.users,
  allUsersStatus: state.users.allUsersStatus,
  upErrors: state.users.upErrors,
  delErrors: state.users.delErrors,
  updateInfo: state.users.updateInfo,
  deleteInfo: state.users.deleteInfo,
})

const mapDispatchToProps = {
  allUsers,
  updateUser,
  deleteUser,
  userInfoDelete,
}

const AllUsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsers)

export default AllUsersContainer;
