from django.core.management.base import BaseCommand
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import umap
import plotly.express as px


# Get data and process it
penguins = pd.read_csv("https://raw.githubusercontent.com/allisonhorst/palmerpenguins/c19a904462482430170bfe2c718775ddb7dbb885/inst/extdata/penguins.csv")

# Remove empty data
penguins = penguins.dropna()

# Create UMAP object
reducer = umap.UMAP()

# Perform UMAP embedding
penguin_data = penguins[
    [
        "bill_length_mm",
        "bill_depth_mm",
        "flipper_length_mm",
        "body_mass_g",
    ]
].values
scaled_penguin_data = StandardScaler().fit_transform(penguin_data)

embedding = reducer.fit_transform(scaled_penguin_data)

# Make Data Frame for website display with the embedding results
embedding_df = pd.DataFrame(embedding, columns=['X', 'Y'])
embedding_df['species'] = penguins['species'].values

# Make interactive graph
fig = px.scatter(
    embedding_df, x='X', y='Y',
    color='species',
    title='UMAP projection of the Penguin dataset'
)

# Save the plot as an HTML file
fig.write_html('static/umap_plot.html')
