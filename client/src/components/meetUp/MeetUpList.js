import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/MeetUpList.css';
import * as actions from '../../actions';

import MeetUpAll from './MeetUpAll'
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class MeetUpsList extends Component {
    constructor() {
        super()
        this.state = { query: "", schools: ['UBC', 'SFU', 'EMILY CARR'] };
        this.filterSchool = this.filterSchool.bind(this);
    }

    //clear localSotrage data that was stored from show page.
    componentWillMount() {
        window.localStorage.clear();
    }

    componentDidMount() {
        this.props.fetchMeetUps();
    }

    //show expired message  
    componentDidUpdate() {
        this.props.meetUp.map(meetup => {
            if (Date.parse(meetup.date) < new Date() && !meetup.expired) {
                this.props.expiredMeetUps(meetup._id);
            }
        })
    }

    //Render one or all meet up
    renderMeetUp = () => {
        return this.props.meetUp.filter(meetUp => meetUp.school.toLowerCase().includes(this.state.query.toLowerCase()))
            .reverse().map(meetUp =>
                < MeetUpAll meetUp={meetUp} id={meetUp._id} />
            )
    }

    //filter by school name 
    filterSchool = (event, index, value) => {
        this.setState({
            query: value
        })
    }

    //selection for listing meetup by school names
    showNameSelection() {
        return (
            <MuiThemeProvider>
                <DropDownMenu value={this.state.query} onChange={this.filterSchool}id="drop-down-menu">
                    <MenuItem value="" primaryText="All" />
                    {this.state.schools.map(names =>
                        <MenuItem value={names} primaryText={names} />)}
                </DropDownMenu>
            </MuiThemeProvider>
        )
    }

    meetUpNew() {
        return (
            <button className="blue btn-flat right white-text create-new">
                <Link className="white-text" to="/meetup/new">CREATE NEW EVENT</Link>
                <i class="material-icons">create</i>
            </button>
        )
    }

    render() {
        return (
            <div className="container">
                {this.showNameSelection()}
                {this.meetUpNew()}
                {this.renderMeetUp()}
            </div>
        )
    }
}

const mapStateToProps = ({ meetUp, auth }) => ({ meetUp, auth });

export default connect(mapStateToProps, actions)(MeetUpsList);