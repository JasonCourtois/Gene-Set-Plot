import pandas as pd
import umap
import numpy as np

def jaccard_distance(set1, set2):
    return 1 - (len(set1.intersection(set2)) / len(set1.union(set2)))

file_path = 'C:\\Users\\jcour\\Work Github\\Gene-Set-Visualizer\\static\\enrichment-GO.tsv'
df = pd.read_csv(file_path, sep='\t', header=0)

n = df.shape[0]

distance_matrix = np.zeros((n, n))

for i in range(n):
    for j in range (i + 1, n):
        set1 = set(df.iloc[i, 6].split())
        set2 = set(df.iloc[j, 6].split())
        dist = jaccard_distance(set1, set2)
        distance_matrix[i, j] = dist
        distance_matrix[j, i] = dist


reducer = umap.UMAP(metric='precomputed')

embedding = reducer.fit_transform(distance_matrix)

# Make Data Frame for website display with the embedding results
embedding_df = pd.DataFrame(embedding, columns=['X', 'Y'])
embedding_df['Q-value'] = df['Q-value'].values
embedding_df['Gene set name'] = df['Gene set name'].values
embedding_df['Effective gene set size'] = df['Effective gene set size'].values
embedding_df['Molecules contributed to enrichment'] = df['Molecules contributed to enrichment'].values

embedding_df_json = embedding_df.to_json(orient='records')
# Save the JSON to a file or pass it to your frontend
json_path = 'C:\\Users\\jcour\\Work Github\\Gene-Set-Visualizer\\static\\embedding_df.json'
with open(json_path, 'w') as f:
    f.write(embedding_df_json)