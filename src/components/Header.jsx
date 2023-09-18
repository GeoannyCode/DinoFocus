import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ['Pomodoro', 'Short Break', 'Long Break'];

export default function Header({currentTime, setCurrentTime ,setTime}){

    function handlePress(index){
        const newTime = index === 0 ? 25: index === 1 ? 5: 15;
        setCurrentTime(index); 
        setTime(newTime * 60);
    }


    return(
        <View style={{flexDirection: "row"}}>

            {options.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={()=> handlePress(index)} 
                    style={[Styles.itemStyle, currentTime !== index && { borderColor: 'transparent' }]}
                >
                    <Text style={Styles.itemText} >{item}</Text>
                </TouchableOpacity>
            ))}
            
        </View>
    )
}

const Styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        borderWidth: 3,
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        borderColor: "#FB2576",
        marginVertical: 20,
    },
    itemText: {
        fontWeight:'bold',
        color: '#3E001F'
    }
})