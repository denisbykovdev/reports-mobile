import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fonts from "../utils/fonts";
import { responsiveHeight, responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const CommonSubHeader = ({ title, children, subHeaderStyle, subHeaderTitleStyle }) => (
    <View style={[styles.subHeader, subHeaderStyle]}>
        <Text style={[styles.subHeaderTitle, subHeaderTitleStyle]}>
            {title}
        </Text>
        <View style={styles.subHeaderChildren}>
            {children}
        </View>
    </View>
)

const styles = StyleSheet.create({
    subHeader: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center",
        marginVertical: responsiveHeight(28),
        // marginHorizontal: responsiveWidth(30)
    },
    subHeaderTitle: {
        fontSize: fonts.large,
        fontWeight: weights.semiBold,
        marginRight: responsiveWidth(10)
    },
    subHeaderChildren: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CommonSubHeader;