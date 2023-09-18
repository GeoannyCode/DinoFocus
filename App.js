import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Platform, 
  Text, 
  View, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import Header from './src/components/Header';
import Timer from './src/components/Timer';


export default function App() {
  
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK' );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(()=> {
        setTime(time-1);
      }, 1000);
    }else{
      clearInterval(interval);
    }

    let newTime = currentTime === 0 ? 25*60: currentTime === 1 ? 300:900;

    if(time === 0){
      playBellSound()
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(newTime)
    }

    return() => clearInterval(interval);

  }, [isActive, time])

  function handleStartStop(){
    setIsActive(!isActive);
    playSound();
  }

  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/ding.mp3')
    )
    await sound.playAsync();
  }

  async function playBellSound(){
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/bell_sound.mp3')
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: colors[currentTime]}]}>
      <View style={[styles.view ,{paddingTop:Platform.OS == "android" && 30 }]}>
        <Text style={styles.title} >DinoFocus</Text>        
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime} 
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.btnText} >{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const colors = ['#D09CFA','#D09CFA','#D09CFA']

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  view:{
    flex: 1,
    paddingHorizontal: 15,
  },
  title:{
    fontSize: 32,
    fontWeight: "bold",
    color: '#3E001F',
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#FB2576',
    padding: 10,
    borderRadius: 15,
  },
  btnText:{
    fontSize: 25,
    color: '#3E001F',
    fontWeight: 'bold'
  }
});
