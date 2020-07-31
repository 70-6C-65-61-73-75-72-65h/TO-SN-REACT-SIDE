import React, {Component, Suspense} from 'react';
// import Preloader from '../components/common/Preloader/Preloader';

const withSupspend = (WrappedComponent, FallbackComponent = <div className=''>Loading ...</div>) => {
    return class extends Component {
        render(){
            return <Suspense fallback={FallbackComponent}>
                    <WrappedComponent {...this.props}/>
                    </Suspense>
        }
    }
}

export default withSupspend;