#!/bin/bash

# Set the output directory
OUTPUT_DIR="/builds"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Run the React Native build command
npx react-native build-android --mode=release

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully."
    
    # Move the build output to the /builds directory
    mv android/app/build/outputs/bundle/release/*.bundle "$OUTPUT_DIR"
    
    echo "Build artifacts moved to $OUTPUT_DIR"
else
    echo "Build failed. Please check the logs for details."
fi

echo "Script execution completed."
