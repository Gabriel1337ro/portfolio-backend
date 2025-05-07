import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';

const ProjectDetailsScreen = ({ route }) => {
  const { project } = route.params;

  const openUrl = async (url) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: project.imageUrl }}
        style={styles.projectImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description}>{project.description}</Text>
        
        <View style={styles.technologiesContainer}>
          <Text style={styles.technologiesTitle}>Technologies Used:</Text>
          <Text style={styles.technologies}>{project.technologiesUsed}</Text>
        </View>

        <View style={styles.linksContainer}>
          {project.projectUrl && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => openUrl(project.projectUrl)}
            >
              <Text style={styles.linkButtonText}>View Project</Text>
            </TouchableOpacity>
          )}
          
          {project.githubUrl && (
            <TouchableOpacity
              style={[styles.linkButton, styles.githubButton]}
              onPress={() => openUrl(project.githubUrl)}
            >
              <Text style={styles.linkButtonText}>View on GitHub</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  projectImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  technologiesContainer: {
    marginBottom: 20,
  },
  technologiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  technologies: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProjectDetailsScreen; 