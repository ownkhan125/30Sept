import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import React from 'react'

const  skeleton = () => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      );
}


export default Skeleton
