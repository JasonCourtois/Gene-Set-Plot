import pandas as pd
import umap
import numpy as np

def jaccard_distance(set1, set2):
    return 1 - (len(set1.intersection(set2)) / len(set1.union(set2)))

def umap_reduction(umapSettings):
    file_path = 'C:\\Users\\jcour\\Work Github\\Gene-Set-Visualizer\\static\\enrichment-GO.tsv'
    df = pd.read_csv(file_path, sep='\t', header=0)

    n = df.shape[0]

    distance_matrix = np.zeros((n, n))

    for i in range(n):
        for j in range (i + 1, n):
            set1 = set(df.loc[i, "Molecules contributed to enrichment"].split())
            set2 = set(df.loc[j, "Molecules contributed to enrichment"].split())
            dist = jaccard_distance(set1, set2)
            distance_matrix[i, j] = dist
            distance_matrix[j, i] = dist

    settings = []
    reducer = None

    if len(umapSettings) != 0:
        settings = umapSettings.split('-')
        neighbors = int(settings[0])
        
        seed = int(settings[1])

        distance = float(settings[2])
       
        if seed == 0:
            seed = None
        
        reducer = umap.UMAP(metric='precomputed', n_neighbors=neighbors, random_state=seed, min_dist=distance)
    else:
        reducer = umap.UMAP(metric='precomputed')
    

    embedding = reducer.fit_transform(distance_matrix)

    # Make Data Frame for website display with the embedding results
    embedding_df = pd.DataFrame(embedding, columns=['X', 'Y'])
    embedding_df['qValue'] = df['Q-value'].values
    embedding_df['setName'] = df['Gene set name'].values
    embedding_df['setSize'] = df['Effective gene set size'].values
    embedding_df['molecules'] = df['Molecules contributed to enrichment'].values

    embedding_df_json = embedding_df.to_json(orient='records')
    # Save the JSON to a file or pass it to your frontend
    return embedding_df_json
