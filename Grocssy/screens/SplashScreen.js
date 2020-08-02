import React from 'react';
import { Button, View, Text , Image , Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

function SplashScreen({ navigation }) {
  return (
    <View style={styles.mainstyles}>
        <View style={styles.header}>
            <Animatable.Image source={require('../assests/images/logo.jpeg')} style={styles.logostyles} resizeMode="stretch" animation="bounceIn"
                duraton="1500" />
                <Animatable.View animation="slideInLeft" >
                <Text style={styles.tagline} >Home needs made easier</Text>
                </Animatable.View>
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.text}>Our Supermarket chain at your Doorstep</Text>
            <Text style={styles.text}>SignIn with your Vendor Account</Text>
            <View style={styles.button}>
            <TouchableOpacity style={styles.getstarted}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Get Started</Text>
            </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.18;

const styles = 
{
    header: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#589507',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    text:{
        color:'#FFF',
        marginTop:5
    },
    button:{
        color:'#FFF',
        marginTop:5
    },
    mainstyles:{
        flex:1,
        backgroundColor: '#fff'
    },
    headerstyles:{
        flex:1,
        margin:10
    },
    imagestyles:{
        flex:5,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerstyles:{
        flex:1,
        margin:10
    },
    getstarted:{
        alignSelf: 'stretch',
        height:50,
        backgroundColor:'#FFF',
        borderRadius:5,
        marginTop:20
    },
    buttonText:{
        textAlign:'center',
        marginTop:15,
        fontSize:18,
        color:'#589507'
    },

    headerText:{
        color:'#7BC01E',
        fontSize:18,
        textAlign:'center'
    },
    logostyles:{
        width: height_logo,
        height: height_logo
    },
    tagline:{
        fontSize:18
    }

};

export default SplashScreen;
