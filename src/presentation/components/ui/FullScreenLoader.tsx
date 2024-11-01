import { ColorValue, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

interface Props {
  backgroundColor?: ColorValue
}

const FullScreenLoader = ({backgroundColor}: Props) => {

  const { colors } = useTheme()
  const bgColor = backgroundColor ? backgroundColor : colors.background
  
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColor
    }}>
      <ActivityIndicator color="white" size={50}/>
    </View>
  )
}
export default FullScreenLoader