import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  numbers: {
    borderRadius: 4,
    margin: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  scrollViewWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    ...Platform.select({
      web: {
        scrollSnapType: 'x mandatory',
      },
    }),
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
  },
  imageWrapper: {
    flex: 1,
    ...Platform.select({
      web: {
        scrollSnapAlign: 'start',
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#eee',
  },
  arrowScrollWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
})

export default styles
