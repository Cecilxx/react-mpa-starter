import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Hello from '../views/hello'
import * as HelloActions from '../modules/hello'

function mapStateToProps (state) {
  return {
    homeReducer: state.homeReducer
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(HelloActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
