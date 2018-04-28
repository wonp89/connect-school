import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/EventList.css';
import * as actions from '../../actions';

import EventAll from './EventAll'
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class EventList extends Component {
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
        this.props.fetchEvents();
    }

    //show expired message  
    componentDidUpdate() {
        this.props.event.map(event => {
            if (Date.parse(event.date) < new Date() && !event.expired) {
                this.props.expiredEvents(event._id);
            }
        })
    }

    //Render one or all event 
    renderEvents = () => {
        return this.props.event.filter(event => event.school.toLowerCase().includes(this.state.query.toLowerCase()))
            .reverse().map(event =>
                < EventAll event={event} id={event._id} />
            )
    }

    //filter by school name 
    filterSchool = (event, index, value) => {
        this.setState({
            query: value
        })
    }

    //selection for listing event by school names
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

    eventNew() {
        return (
            <button className="blue btn-flat right white-text create-new">
                <Link className="white-text" to="/event/new">CREATE NEW EVENT</Link>
                <i class="right material-icons">create</i>
            </button>
        )
    }

    render() {
        return (
            <div className="container">
                {this.showNameSelection()}
                {this.eventNew()}
                {this.renderEvents()}
            </div>
        )
    }
}

const mapStateToProps = ({ event, auth }) => ({ event, auth });

export default connect(mapStateToProps, actions)(EventList);