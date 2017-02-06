import React, { PropTypes } from 'react';
import { Text, View, Modal } from 'react-native';

import { CardSection } from '../common/CardSection';
import { Button } from '../common/Button';

export const Confirm = ({ children, onAccept, onDecline, visible }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <CardSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyles}>{children}</Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

Confirm.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

Confirm.defaultProps = {
  visible: false,
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyles: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
};

export default Confirm;
