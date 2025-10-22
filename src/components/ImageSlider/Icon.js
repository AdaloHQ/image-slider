import MIcon from 'react-native-vector-icons/MaterialIcons'
import { Image } from 'react-native'

export const isURL = value =>
  value && typeof value === 'string' && value.startsWith('https://')

const Icon = ({ name, size = 20, color }) => {
  if (isURL(name)) {
    return (
      <span
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          maskImage: `url(${name})`,
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
        }}
      ></span>
    )
  }

  return <MIcon name={name} size={size} color={color} />
}

export default Icon
