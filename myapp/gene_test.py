import pandas as pd
import umap
import numpy as np
import base64
from io import BytesIO

def jaccard_distance(set1, set2):
    return 1 - (len(set1.intersection(set2)) / len(set1.union(set2)))

def umap_reduction(umapSettings, fileData):
    format, tsvData = fileData.split(';base64,') 
  
    file_content = base64.b64decode(tsvData)

    tsvFile = BytesIO(file_content)

    df = pd.read_csv(tsvFile, sep='\t', header=0)

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
    
    # Sort entries by descending order of qValue so if two points overlap, the point with the more significant q value appears on top
    embedding_df = embedding_df.sort_values(by='qValue', ascending=False)

    embedding_df_json = embedding_df.to_json(orient='records')

    # Save the JSON to a file or pass it to your frontend
    return embedding_df_json
