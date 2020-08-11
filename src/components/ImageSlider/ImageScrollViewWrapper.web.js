import React from 'react'
import ImageScrollView from './ImageScrollView'
import ScrollContainer from 'react-indiana-drag-scroll'

const ImageScrollViewWrapper = React.forwardRef((props, ref) => {
  const {
    handleScroll,
    handleScrollWeb,
    handlePress,
    editor,
    wrapperStyles,
    innerWrapper,
    images,
  } = props
  return (
    <ScrollContainer vertical={false} onScroll={handleScrollWeb}>
      <ImageScrollView
        ref={ref}
        handleScroll={handleScroll}
        handlePress={handlePress}
        editor={editor}
        wrapperStyles={wrapperStyles}
        innerWrapper={innerWrapper}
        images={images}
      />
    </ScrollContainer>
  )
})

export default ImageScrollViewWrapper
