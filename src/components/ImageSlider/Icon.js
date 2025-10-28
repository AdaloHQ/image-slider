import MIcon from 'react-native-vector-icons/MaterialIcons'
import { Image } from 'react-native'

export const isURL = value =>
  value && typeof value === 'string' && value.startsWith('https://')

const Icon = ({ name, size = 20, color }) => {
  if (isURL(name)) {
    return (
      <Image
        source={{ uri: name }}
        style={{ width: size, height: size, tintColor: color }}
      />
    )
  }

  return <MIcon name={name} size={size} color={color} />
}

export default Icon
