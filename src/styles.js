import { Dimensions, Platform } from 'react-native'

titleSize = 25
headerSize = 20
regularSize = 17
smallSize = 15

hugeSpacing = 25
bigSpacing = 20
middleSpacing = 15
regularSpacing = 10
smallSpacing = 5

export default styles = {
    // CONTAINERS
    container: {
        backgroundColor: '#FFF',
        marginTop: Platform.OS === 'android' ? hugeSpacing : 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    grayContainer: {
        backgroundColor: '#F6F6F6',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop: Platform.OS === 'android' ? hugeSpacing : 0
    },
    loginContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: bigSpacing,
        padding: middleSpacing
    },
    menuContainer: {
        backgroundColor: '#236CF6'
    },
    centerContainer: {
        padding: bigSpacing,
        paddingBottom: 0,
        paddingTop: 0
    },
    fieldContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingBottom: middleSpacing,
        paddingTop: regularSpacing
    },
    itemContainer: {
        padding: regularSpacing,
        borderBottomColor: '#BCBBC1',
        borderBottomWidth: 1
    },

    ellipse: {
        width: 53,
        height: 53,
        marginTop: hugeSpacing,
        backgroundColor: '#EAF0FD',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ellipseText: {
        color: '#236CF6',
        fontSize: titleSize,
        fontFamily: 'SF_Pro_Semibold'
    },
    unitContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        padding: regularSize,
        paddingTop: 5,
        margin: regularSpacing,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: '#f6f6f6'
    },
    pairContainer: {
        marginTop: smallSpacing,
        flexDirection: 'row'
    },
    pickerContainer: {
        height: 30,
        width: '100%',
        color: '#343659'
    },

    //TEXT STYLES
    valueContainer: {
        padding: regularSpacing,
        backgroundColor: '#F3F4F8',
        borderRadius: 10,
        marginTop: smallSpacing,
        color: '#343659',
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: titleSize,
        fontFamily: 'SF_Pro_Semibold',
        marginTop: hugeSpacing,
        color: '#343659'
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: middleSpacing,
        paddingBottom: smallSpacing
    },
    keyText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#9FA0B4',
        lineHeight: 30,
        marginRight: regularSpacing
    },
    valueText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#343659',
        lineHeight: 30,
        marginRight: regularSpacing
    },
    textButton: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#343659',
        lineHeight: 30
    },
    redText: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#EC5836',
        lineHeight: 30,
        marginRight: regularSpacing
    },
    actionText: {
        fontSize: smallSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#8A95AA',
        marginTop: smallSpacing,
        textAlign: 'center',
        letterSpacing: 0.6,
        lineHeight: 20
    },
    input: {
        color: '#9FA0B4',
        padding: bigSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        flex: 1
    },
    picker_block: {
        color: '#9FA0B4',
        padding: smallSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        flex: 1
    },
    dateInput: {
        color: '#343659',
        padding: bigSpacing,
        height: 100,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        flex: 1
    },
    linkText: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#236CF6',
        marginLeft: smallSpacing
    },
    linkTextSelect: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#236CF6',
        marginLeft: 0
    },
    buttonText_icon: {
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        letterSpacing: 0.7,
        color: '#ffffff',
        marginLeft: smallSpacing,
        verticalAlign: 'middle'
    },
    dividerText: {
        fontSize: headerSize,
        fontFamily: 'SF_Pro_Semibold',
        color: '#343659',
        lineHeight: 30,
        marginTop: middleSpacing
    },

    iconInput: {
        backgroundColor: '#F3F4F8',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    leftIcon: {
        marginLeft: middleSpacing,
        resizeMode: 'stretch'
    },
    rightIcon: {
        marginRight: middleSpacing,
        resizeMode: 'stretch'
    },

    //MARGINS
    usernameMargin: {
        marginTop: 2 * hugeSpacing
    },
    regularTMargin: {
        marginTop: regularSpacing
    },


    //BUTTON
    button: {
        marginTop: middleSpacing,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#236CF6',
        width: '100%',
        borderRadius: 10,
        color: '#000',
    },
    buttonText: {
        color: "#fff",
        fontFamily: 'SF_Pro_Semibold',
        fontSize: regularSize
    },

    //MENU
    closeIcon: {
        marginTop: 2 * hugeSpacing,
        marginLeft: bigSpacing,
        marginBottom: bigSpacing
    },
    topPanel: {
        alignItems: 'center',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        padding: middleSpacing,
        paddingTop: 0
    },
    title: {
        fontFamily: 'SF_Pro_Bold',
        fontSize: titleSize,
        color: '#fff',
        flex: 1
    },
    settingsLink: {
        flexDirection: 'row'
    },
    settingsText: {
        marginRight: regularSpacing,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        color: '#fff',
        opacity: 0.7,
        marginTop: smallSpacing
    },
    menuItem: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: middleSpacing,
        paddingBottom: regularSpacing
    },
    menuItemText: {
        fontFamily: 'SF_Pro_Semibold',
        color: '#fff',
        fontSize: regularSize,
        marginLeft: bigSpacing,
        flex: 1
    },
    menuText: {
        fontFamily: 'SF_Pro_Semibold',
        color: '#fff',
        fontSize: regularSize,
        marginLeft: middleSpacing,
        marginBottom: regularSpacing,
        flex: 1
    },

    menuSubText: {
        fontFamily: 'SF_Pro_Semibold',
        color: '#fff',
        fontSize: smallSize,
        marginLeft: middleSpacing,
        marginBottom: regularSpacing,
    },
    expandedItem: {
        backgroundColor: '#4384FF',
        padding: regularSpacing,
        paddingLeft: 2 * hugeSpacing
    },
    expandedText: {
        padding: regularSpacing,
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize,
        color: '#fff'
    },
    menuContent: {
        color: "#000",
        fontWeight: "bold",
        padding: 2,
        fontSize: 20
    },

    //HEADER
    header: {
        flexDirection: 'row',
        backgroundColor: '#236CF6',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerText: {
        fontFamily: 'SF_Pro_Semibold',
        fontSize: regularSize,
        color: '#fff',

    },
    headerTextLeft: {
        fontFamily: 'SF_Pro_Semibold',
        fontSize: regularSize,
        color: '#fff',
        marginRight: 2 * bigSpacing
    },
    headerTitleView: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingRight: 80
    },

    //EXPANSION PANEL
    panel: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        paddingTop: bigSpacing,
        marginBottom: middleSpacing,
        paddingBottom: regularSpacing,
        padding: smallSpacing
    },
    panel_small: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1,
        paddingTop: smallSpacing,
        marginBottom: middleSpacing,
        // paddingBottom: smallSpacing,
        padding: smallSpacing
    },
    expandPanel: {
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        padding: regularSpacing,
        paddingBottom: 0,
        paddingTop: regularSpacing,
        flexDirection: 'row'
    },
    iconStyle: {
        marginTop: middleSpacing
    },
    status: {
        width: 12,
        height: 12,
        marginRight: 15,
        marginTop: 6,
        borderRadius: 20
    },


    //SUBMENU PANEL
    itemPanel: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lightItemPanel: {
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subItemPanel: {
        backgroundColor: '#F6F6F6',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: regularSpacing,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontFamily: 'SF_Pro_Regular',
        color: '#343659',
        lineHeight: 30
    },
    itemsContainer: {
        marginTop: 30,
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
    },

    //FORM STYLES
    radioForm: {
        marginTop: regularSize
    },
    addCommentStyle: {
        fontSize: regularSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#236CF6',
        marginTop: regularSpacing
    },
    quantButton: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: regularSpacing,
        marginLeft: regularSpacing,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#050215',
        shadowRadius: 3,
        shadowOpacity: 0.1
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#ccc',
        position: 'absolute',
        bottom: 50,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderColor: '#999BAC',
        borderWidth: 1,
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },
    okCircle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#236CF6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },
    notOkCircle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#EC5836',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: regularSpacing,
        marginTop: smallSpacing
    },

    //SEARCH BAR

    searchBar: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
    },
    searchInput: {
        height: 40,
        color: '#343659',
        fontFamily: 'SF_Pro_Regular',
        fontSize: regularSize
    },
    searchWrapper: {
        flex: 0,
        flexShrink: 1,
        flexGrow: 1,
    },

    errorText: {
        fontSize: smallSize,
        fontFamily: 'SF_Pro_Regular',
        color: '#CC0000',
        marginTop: regularSpacing,
        textAlign: 'center',
        letterSpacing: 0.6,
        lineHeight: 20
    }
}