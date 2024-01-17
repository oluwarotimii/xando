import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";



const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.optionTxt}> Start Game</Text>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.mulBtn}>
                    <Text style={styles.optionTxt}>  Multiplayer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.compBtn}>
                    <Text style={styles.optionTxt}> Computer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: ' 60%',
    },
    btnView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    compBtn:{
        borderWidth: 1,
        margin: '8%',
    },
    mulBtn:{
        borderWidth: 1,
        margin: '8%',
    },
    optionTxt:{
        fontSize: 20,
        fontWeight: 'bold',
        padding: '5%',
      }
})
export default HomeScreen;

    //comments
