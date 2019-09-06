import React from 'react'
import { connect } from "react-redux"

const FirstModal = (props) => (
    <div>
        <h1> Just another modal </h1>
    </div>  
);

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstModal)