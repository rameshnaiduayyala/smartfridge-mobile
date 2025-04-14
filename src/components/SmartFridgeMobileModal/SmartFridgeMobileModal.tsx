import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, DimensionValue } from "react-native";

interface ISmartFridgeModalProps {
    show: boolean;
    width?: string | number;
    headerText?: string;
    displayFooter?: boolean;
    headerButtonTxt?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    tertiaryBtnTxt?: string;
    modalBodyComponent?: React.ReactNode;
    handlePrimaryBtn?: () => void;
    handleSecondaryBtn?: () => void;
    handleTertiaryBtn?: () => void;
    handleHeaderBtn?: () => void;
    onClose: () => void;
}

const SmartFridgeModal: React.FC<ISmartFridgeModalProps> = ({
    show,
    width = "90%",
    headerText = "Smart Fridge",
    displayFooter = false,
    primaryButtonText = "Confirm",
    secondaryButtonText = "Cancel",
    tertiaryBtnTxt,
    modalBodyComponent,
    handlePrimaryBtn,
    handleSecondaryBtn,
    handleTertiaryBtn,
    onClose,
}) => {
    return (
        <Modal
            visible={show}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { width: width as DimensionValue }]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{headerText}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>{modalBodyComponent}</View>
                    {displayFooter && (
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.secondaryButton} onPress={handleSecondaryBtn}>
                                <Text style={styles.buttonText}>{secondaryButtonText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.primaryButton} onPress={handlePrimaryBtn}>
                                <Text style={styles.buttonText}>{primaryButtonText}</Text>
                            </TouchableOpacity>
                            {tertiaryBtnTxt && (
                                <TouchableOpacity style={styles.primaryButton} onPress={handleTertiaryBtn}>
                                    <Text style={styles.buttonText}>{tertiaryBtnTxt}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        fontSize: 18,
        color: "red",
    },
    body: {
        marginBottom: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    primaryButton: {
        backgroundColor: "#0bbda5",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    secondaryButton: {
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default SmartFridgeModal;
